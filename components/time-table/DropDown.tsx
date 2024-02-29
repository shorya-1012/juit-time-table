import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, DropdownSection } from "@nextui-org/react";

const DropDown = () => {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    return (
        <div>


            <Dropdown
                showArrow
                classNames={{
                    base: "before:bg-default-200", // change arrow background
                    content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
                }}
            >
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        isIconOnly
                    >
                        o
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                    <DropdownSection title="Actions">
                        <DropdownItem
                            key="new"
                            shortcut="⌘N"
                            description="Create a new file"
                            
                        >
                            New file
                        </DropdownItem>
                        <DropdownItem
                            key="copy"
                            shortcut="⌘C"
                            description="Copy the file link"
                        >
                            Copy link
                        </DropdownItem>
                        <DropdownItem
                            key="edit"
                            shortcut="⌘⇧E"
                            description="Allows you to edit the file"
                        >
                            Edit file
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownSection title="Danger zone">
                        <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            shortcut="⌘⇧D"
                            description="Permanently delete the file"
                        >
                            Delete file
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>

        </div>
    )
}

export default DropDown