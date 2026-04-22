import type { backendInterface } from "../backend";
import type { AdminTask } from "../backend.d";
import { toNumber } from "../utils/convert";

export interface AdminTaskView {
  id: string;
  title: string;
  description: string;
  notes: string;
  category: string;
  priority: string;
  assignedTo?: string;
  completed: boolean;
  createdAt: number;
  dueDate?: number;
}

export function mapTask(raw: AdminTask): AdminTaskView {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    notes: raw.notes,
    category: raw.category,
    priority: raw.priority,
    assignedTo: raw.assignedTo,
    completed: raw.completed,
    createdAt: toNumber(raw.createdAt) / 1_000_000,
    dueDate: raw.dueDate ? toNumber(raw.dueDate) / 1_000_000 : undefined,
  };
}

export function mapToBackendTask(view: AdminTaskView): AdminTask {
  return {
    id: view.id,
    title: view.title,
    description: view.description,
    notes: view.notes,
    category: view.category,
    priority: view.priority,
    assignedTo: view.assignedTo,
    completed: view.completed,
    createdAt: BigInt(Math.round(view.createdAt * 1_000_000)),
    dueDate: view.dueDate
      ? BigInt(Math.round(view.dueDate * 1_000_000))
      : undefined,
  };
}

export async function getTasks(
  actor: backendInterface,
): Promise<AdminTaskView[]> {
  const raw = await actor.getTasks();
  return raw.map(mapTask).sort((a, b) => b.createdAt - a.createdAt);
}

export async function createAdminTask(
  actor: backendInterface,
  task: AdminTaskView,
): Promise<AdminTaskView> {
  const raw = await actor.createAdminTask(mapToBackendTask(task));
  return mapTask(raw);
}

export async function updateAdminTask(
  actor: backendInterface,
  id: string,
  task: AdminTaskView,
): Promise<AdminTaskView | null> {
  const raw = await actor.updateAdminTask(id, mapToBackendTask(task));
  return raw ? mapTask(raw) : null;
}

export async function deleteAdminTask(
  actor: backendInterface,
  id: string,
): Promise<boolean> {
  return actor.deleteAdminTask(id);
}

export async function completeAdminTask(
  actor: backendInterface,
  id: string,
): Promise<boolean> {
  return actor.completeAdminTask(id);
}
