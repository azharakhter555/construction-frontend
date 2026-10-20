// hooks/useBreadcrumb.ts
import { usePathname } from "next/navigation";
import { navigation } from "@/config/navigation";
import type { BreadcrumbItem } from "@/components/shared/breadcrumb/Breadcrumb";

export function useBreadcrumb() {
  const pathname = usePathname();

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);

    if (paths.length === 0 || (paths.length === 1 && paths[0] === "dashboard")) {
      return [{ label: "Dashboard", href: "/dashboard" }];
    }

    const items: BreadcrumbItem[] = [];
    let currentPath = "";

    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      items.push({
        label,
        href: index === paths.length - 1 ? undefined : currentPath,
      });
    });

    return items;
  };

  const findPageTitle = (items: typeof navigation, path: string): string | null => {
    for (const item of items) {
      if (item.href === path) return item.title;
      if (item.children) {
        const found = findPageTitle(item.children as typeof navigation, path);
        if (found) return found;
      }
    }
    return null;
  };

  const breadcrumbItems = getBreadcrumbItems();
  const currentTitle = findPageTitle(navigation, pathname);

  const updatedBreadcrumbItems: BreadcrumbItem[] = [...breadcrumbItems];

  if (currentTitle && updatedBreadcrumbItems.length > 0) {
    updatedBreadcrumbItems[updatedBreadcrumbItems.length - 1] = {
      ...updatedBreadcrumbItems[updatedBreadcrumbItems.length - 1],
      label: currentTitle,
    };
  }

  return updatedBreadcrumbItems;
}
