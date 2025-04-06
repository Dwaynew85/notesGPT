"use client"

import { Note } from "@prisma/client";

type NotesProps = {
  notes: Note[];
}
const SidebarGroupContent = ({ notes }: NotesProps) => {
  console.log(notes)
  return (
    <div>Your notes here</div>
  )
}

export default SidebarGroupContent