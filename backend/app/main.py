"""Application entrypoint.

Generated from the approved architecture: one router per component that owns
endpoints, one route per endpoint the API spec declares. Every generated route
is a stub that returns a typed placeholder, so the service starts, serves its
OpenAPI document and passes its tests before a single handler is implemented.
"""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models  # noqa: F401 -- imported so the tables register before create_all
from app.bootstrap import seed_bootstrap_users
from app.config import get_settings
from app.database import Base, SessionLocal, engine
from app.routers import api as api_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """The scaffold ships no migrations, so the tables are created from the models
    when the application starts. Replace this with Alembic before anything holds data
    worth keeping.

    This runs on startup and not at import, so importing the application never opens a
    connection. A test can therefore point `get_db` at a database of its own, and a
    deployment whose `DATABASE_URL` names a server that is not up fails where you can
    read the error, not while pytest collects the files.
    """
    Base.metadata.create_all(bind=engine)

    # MEDIA_ROOT is a writable directory that survives redeploys; make sure it exists
    # before anything tries to write into it.
    settings.media_root.mkdir(parents=True, exist_ok=True)

    # The first admin and the smoke-test patient, from the environment, created only
    # when they are not there already. Nothing is seeded when the variables are unset.
    with SessionLocal() as session:
        seed_bootstrap_users(session, settings)

    yield


app = FastAPI(
    title="MediBook V1",
    description="Develop a web-based healthcare appointment management application where patients can search for doctors based on their disease, symptoms, or medical specialization, view available doctors and their consultation time slots, and book, reschedule, or cancel appointments. Doctors can manage their availability, view scheduled appointments, maintain patient consultation records, and update consultation statuses. The system should support role-based access for patients, doctors, and administrators, with an admin dashboard to manage doctors, specializations, and appointments. The application must use predefined disease-to-specialization mappings to help patients find relevant doctors, without using AI, LLMs, or machine learning. It should prevent double bookings and display real-time appointment availability. **No payment gateway or online payment functionality is required.**",
    version="0.1.0",
    lifespan=lifespan,
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# The routes the approved API spec declares. Each handler is still a stub; mounting
# them here means the OpenAPI document, and the frontend written against it, see the
# agreed paths from the first day.
app.include_router(api_router.router)


@app.get("/health")
async def health() -> dict[str, str]:
    """Liveness probe, and the only route here that is not a stub."""
    return {"status": "ok"}
