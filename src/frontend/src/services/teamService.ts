import type { backendInterface } from "../backend";
import type { TeamMember } from "../backend.d";
import { toNumber } from "../utils/convert";

export interface TeamMemberView {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  permissions: string[];
  createdAt: number;
}

export function mapTeamMember(raw: TeamMember): TeamMemberView {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    role: raw.role,
    active: raw.active,
    permissions: raw.permissions,
    createdAt: toNumber(raw.createdAt) / 1_000_000,
  };
}

export function mapToBackendMember(view: TeamMemberView): TeamMember {
  return {
    id: view.id,
    name: view.name,
    email: view.email,
    role: view.role,
    active: view.active,
    permissions: view.permissions,
    createdAt: BigInt(Math.round(view.createdAt * 1_000_000)),
  };
}

export async function getTeamMembers(
  actor: backendInterface,
): Promise<TeamMemberView[]> {
  const raw = await actor.getTeamMembers();
  return raw.map(mapTeamMember);
}

export async function addTeamMember(
  actor: backendInterface,
  member: TeamMemberView,
): Promise<TeamMemberView> {
  const raw = await actor.addTeamMember(mapToBackendMember(member));
  return mapTeamMember(raw);
}

export async function updateTeamMember(
  actor: backendInterface,
  id: string,
  member: TeamMemberView,
): Promise<TeamMemberView | null> {
  const raw = await actor.updateTeamMember(id, mapToBackendMember(member));
  return raw ? mapTeamMember(raw) : null;
}

export async function deleteTeamMember(
  actor: backendInterface,
  id: string,
): Promise<boolean> {
  return actor.deleteTeamMember(id);
}
