import { useState, useCallback } from "react";

interface CRUDOperations<TInput> {
  getAll: () => Promise<any>;
  create: (data: TInput) => Promise<any>;
  update: (id: string, data: TInput) => Promise<any>;
  delete: (id: string) => Promise<any>;
}

interface EntityWithId {
  _id: string;
}

export const useEntityCRUD = <T extends EntityWithId, TInput = Omit<T, "_id">>(
  operations: CRUDOperations<TInput>,
) => {
  const [entities, setEntities] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchEntities = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await operations.getAll();
      setEntities(response.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [operations]);

  const createEntity = useCallback(
    async (data: TInput) => {
      setSaving(true);
      setError("");
      try {
        const response = await operations.create(data);
        const newEntity = response.data.data;
        // Optimistic update
        setEntities((prev) => [...prev, newEntity]);
        return newEntity;
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to create");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [operations],
  );

  const updateEntity = useCallback(
    async (id: string, data: TInput) => {
      setSaving(true);
      setError("");
      const previousEntities = [...entities];

      // Optimistic update
      setEntities((prev) =>
        prev.map((entity) =>
          entity._id === id ? { ...entity, ...data } : entity,
        ),
      );

      try {
        const response = await operations.update(id, data);
        const updatedEntity = response.data.data;
        // Update with server response
        setEntities((prev) =>
          prev.map((entity) => (entity._id === id ? updatedEntity : entity)),
        );
        return updatedEntity;
      } catch (err: any) {
        // Rollback on error
        setEntities(previousEntities);
        setError(err.response?.data?.message || "Failed to update");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [entities, operations],
  );

  const deleteEntity = useCallback(
    async (id: string) => {
      setSaving(true);
      setError("");
      const previousEntities = [...entities];

      // Optimistic update
      setEntities((prev) => prev.filter((entity) => entity._id !== id));

      try {
        await operations.delete(id);
      } catch (err: any) {
        // Rollback on error
        setEntities(previousEntities);
        setError(err.response?.data?.message || "Failed to delete");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [entities, operations],
  );

  return {
    entities,
    loading,
    saving,
    error,
    setError,
    fetchEntities,
    createEntity,
    updateEntity,
    deleteEntity,
  };
};
