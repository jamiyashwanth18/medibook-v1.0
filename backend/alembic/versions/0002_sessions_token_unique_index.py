"""Fix sessions.token uniqueness to match the model: one unique index, no separate
unique constraint.

A database already migrated to 0001 has `uq_sessions_token` (a unique constraint)
plus a non-unique `ix_sessions_token`, left over from an earlier shape of that
table. `UserSession.token` is declared `unique=True, index=True`, which SQLAlchemy
expects as a single unique index -- so the drift check flags the constraint and the
index's `unique` flag until this revision brings an already-migrated database to
that shape. 0001 is never edited for this: a database already stamped at its
revision would never run the edit.
"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0002"
down_revision: str | None = "0001"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def _index_names() -> set[str]:
    bind = op.get_bind()
    return {ix["name"] for ix in sa.inspect(bind).get_indexes("sessions")}


def _unique_constraint_names() -> set[str]:
    bind = op.get_bind()
    return {uc["name"] for uc in sa.inspect(bind).get_unique_constraints("sessions")}


def upgrade() -> None:
    if "uq_sessions_token" in _unique_constraint_names():
        op.drop_constraint("uq_sessions_token", "sessions", type_="unique")

    indexes = {ix["name"]: ix for ix in sa.inspect(op.get_bind()).get_indexes("sessions")}
    existing = indexes.get("ix_sessions_token")
    if existing is not None and not existing.get("unique"):
        op.drop_index("ix_sessions_token", table_name="sessions")
        existing = None
    if existing is None:
        op.create_index("ix_sessions_token", "sessions", ["token"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_sessions_token", table_name="sessions")
    op.create_index("ix_sessions_token", "sessions", ["token"], unique=False)
    op.create_unique_constraint("uq_sessions_token", "sessions", ["token"])
