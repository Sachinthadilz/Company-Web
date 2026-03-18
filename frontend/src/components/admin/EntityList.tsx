import type { ReactNode } from "react";

interface EntityWithId {
  _id: string;
}

interface EntityListProps<T extends EntityWithId> {
  entities: T[];
  title: string;
  renderContent: (entity: T) => ReactNode;
  onEdit: (entity: T) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

export const EntityList = <T extends EntityWithId>({
  entities,
  title,
  renderContent,
  onEdit,
  onDelete,
  emptyMessage = "No items yet.",
}: EntityListProps<T>) => (
  <div>
    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
      {title}
    </h3>
    <div className="mt-3 space-y-3">
      {entities.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        entities.map((entity) => (
          <div
            key={entity._id}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">{renderContent(entity)}</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(entity)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(entity._id)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
