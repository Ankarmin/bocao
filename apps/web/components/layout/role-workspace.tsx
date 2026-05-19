import type { ReactNode } from "react";

import { RoleSidebar, type SidebarIconKey } from "@/components/layout/role-sidebar";

type RoleWorkspaceProps = {
  roleTitle: string;
  links: {
    href: string;
    label: string;
    icon: SidebarIconKey;
  }[];
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function RoleWorkspace({ roleTitle, links, title, subtitle, actions, children }: RoleWorkspaceProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <RoleSidebar title={roleTitle} links={links} />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{roleTitle}</p>
            <h1 className="font-display text-3xl font-extrabold md:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
        {children}
      </main>
    </div>
  );
}
