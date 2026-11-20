"""Settings, read once from the environment.

Every value the platform injects is read here and nowhere else, each with a
working local default, so a fresh clone runs with no environment at all while a
deployment only has to set variables.

Nothing in this module -- or anywhere else in the repository -- may hold a
credential as a literal. The two secrets below fall back to a value generated at
import time when they are unset: a local run works, and the value is never one an
attacker can read out of the source.
"""

import os
import secrets
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path

# Development origins for the Vite dev server, used when ALLOWED_ORIGINS is unset.
DEV_ORIGINS: tuple[str, ...] = ("http://localhost:5173", "http://127.0.0.1:5173")


def _env(name: str, default: str = "") -> str:
    """An environment variable, blank-stripped; `default` when unset or empty."""
    return (os.getenv(name) or "").strip() or default


@dataclass(frozen=True)
class Settings:
    """One immutable snapshot of the environment the process started with."""

    # SQLAlchemy URL. The platform injects a PostgreSQL URL (postgresql+psycopg://...);
    # the SQLite default keeps a bare `uvicorn app.main:app` runnable with no server.
    database_url: str = field(default_factory=lambda: _env("DATABASE_URL", "sqlite:///./app.db"))

    # Comma-separated frontend origins allowed to call this API from a browser.
    allowed_origins_raw: str = field(default_factory=lambda: _env("ALLOWED_ORIGINS"))

    # The shared bearer the generated frontend sends. It is baked into the SPA build and
    # is therefore public: it identifies the frontend, never a user, and signs nothing.
    secret_key: str = field(default_factory=lambda: _env("SECRET_KEY", secrets.token_urlsafe(32)))

    # Private signing key for tokens and sessions. Never sent to a client.
    jwt_secret_key: str = field(
        default_factory=lambda: _env("JWT_SECRET_KEY", secrets.token_urlsafe(32))
    )

    # A writable directory that survives redeploys.
    media_root_raw: str = field(default_factory=lambda: _env("MEDIA_ROOT", "./var/media"))

    # First admin, seeded on startup when both are set (the platform always sets them on
    # the deployed API). Unset locally and in tests, where nothing is seeded.
    bootstrap_admin_email: str = field(default_factory=lambda: _env("BOOTSTRAP_ADMIN_EMAIL"))
    bootstrap_admin_password: str = field(default_factory=lambda: _env("BOOTSTRAP_ADMIN_PASSWORD"))

    # The ordinary (lowest-role) user the smoke run signs in as, seeded the same way.
    smoke_test_email: str = field(default_factory=lambda: _env("SMOKE_TEST_EMAIL"))
    smoke_test_password: str = field(default_factory=lambda: _env("SMOKE_TEST_PASSWORD"))

    # How long an opaque session token stays valid after it is issued.
    session_ttl_hours: int = field(default_factory=lambda: int(_env("SESSION_TTL_HOURS", "12")))

    # Default consultation slot length for a doctor who has not set one.
    default_slot_duration_minutes: int = field(
        default_factory=lambda: int(_env("DEFAULT_SLOT_DURATION_MINUTES", "30"))
    )

    @property
    def allowed_origins(self) -> list[str]:
        """Configured origins, or the local dev server when none were given."""
        origins = [o.strip() for o in self.allowed_origins_raw.split(",") if o.strip()]
        return origins or list(DEV_ORIGINS)

    @property
    def media_root(self) -> Path:
        return Path(self.media_root_raw).expanduser()

    @property
    def is_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """The process-wide settings. Cached, so the generated random fallbacks above
    stay stable for the life of the process; call `get_settings.cache_clear()` in a
    test that changes the environment."""
    return Settings()
