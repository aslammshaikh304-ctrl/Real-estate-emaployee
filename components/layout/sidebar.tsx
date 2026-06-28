"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  CheckSquare,
  BarChart3,
  Settings,
} from "lucide-react";

const items = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Sales Manager", href: "/ai-sales-manager", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Site Visits", href: "/site-visits", icon: CalendarDays },
  { name: "Follow Ups", href: "/followups", icon: CheckSquare },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Pipeline", href: "/pipeline", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-zinc-950 text-white min-h-screen">
      <div className="p-6 text-xl font-bold">
        Rynx Real Estate
      </div>

      <nav className="space-y-2 px-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === item.href
                  ? "bg-zinc-800"
                  : "hover:bg-zinc-900"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}