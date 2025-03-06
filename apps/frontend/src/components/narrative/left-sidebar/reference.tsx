"use client";
import ReferenceSection from "./reference-utils/reference-section";
import { useReferenceController } from "@/controllers/ReferenceController";

export default function Reference() {
  const { referenceData, handleCreateEntity } = useReferenceController();
  // const { availableTags } = useTagController();
  // console.log(availableTags)

  return (
    <>
      {Object.entries(referenceData).map(([key, value]) => (
        <ReferenceSection
          key={key}
          entities={value}
          name={key.charAt(0).toUpperCase() + key.slice(1)}
          availableTags={[]}
          createEntity={() => handleCreateEntity(key.charAt(0).toUpperCase() + key.slice(1))}
        />
      ))}
    </>
  );
}
