import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VIDEO_THEMES } from "@/lib/constants";
import type { ThemeId } from "@/lib/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeMenuProps {
  currentTheme: ThemeId;
  onThemeChange: (id: ThemeId) => void;
}

export function ThemeMenu({ currentTheme, onThemeChange }: ThemeMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "bg-black/50 border-none text-white hover:bg-black/70 hover:text-white",
          )}
        >
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[250px] bg-background/95 backdrop-blur-sm"
        >
          <SheetHeader>
            <SheetTitle>切换主题</SheetTitle>
            <SheetDescription>选择你喜欢的视频类型</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {VIDEO_THEMES.map((theme) => (
              <Button
                key={theme.id}
                variant={currentTheme === theme.id ? "default" : "ghost"}
                className="justify-start"
                onClick={() => {
                  onThemeChange(theme.id);
                  setOpen(false);
                }}
              >
                {theme.name}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
