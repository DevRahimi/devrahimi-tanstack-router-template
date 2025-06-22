import { type JSX, useState } from "react";
// import { useIsMobile } from "@/hooks/use-mobile";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // Drawer,
  // DrawerClose,
  // DrawerContent,
  // DrawerDescription,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerTitle,
  // DrawerTrigger,
} from "@/components/ui";

interface ResponsiveDrawerProps {
  triggerButtonText: string;
  title: string;
  description?: string;
  content: JSX.Element;
}

export function ResponsiveDrawer({ triggerButtonText, title, description, content }: ResponsiveDrawerProps) {
  const [open, setOpen] = useState(false);

  // const isMobile = useIsMobile();

  // if (isMobile) {
  //   return (
  //     <Drawer
  //       open={open}
  //       onOpenChange={setOpen}
  //     >
  //       <DrawerTrigger asChild>
  //         <Button size="sm">{triggerButtonText}</Button>
  //       </DrawerTrigger>
  //       <DrawerContent>
  //         <DrawerHeader className="text-left">
  //           <DrawerTitle>{title}</DrawerTitle>
  //           {!!description && <DrawerDescription>{description}</DrawerDescription>}
  //         </DrawerHeader>

  //         {content}

  //         <DrawerFooter className="mt-auto">
  //           <DrawerClose asChild>
  //             <Button variant="outline">Close</Button>
  //           </DrawerClose>
  //         </DrawerFooter>
  //       </DrawerContent>
  //     </Drawer>
  //   );
  // }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          // size="sm"
          className="rounded-sm"
        >
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {!!description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {content}
      </DialogContent>
    </Dialog>
  );
}
