"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchReferenceData, createEntity } from "@/usecases/referenceUseCase";
import { ReferenceData } from "@/interfaces/ReferenceData";

export const useReferenceController = () => {
  const { id } = useParams();
  const [referenceData, setReferenceData] = useState<ReferenceData>({ characters: [] });

  useEffect(() => {
    async function loadData() {
      const data = await fetchReferenceData(id);
      setReferenceData(data);
    }
    loadData();
  }, [id]);

  const handleCreateEntity = async (type: string) => {
    const newEntity = await createEntity(type, id);
    if (newEntity) {
      // setReferenceData((prevData) => ({
      //   ...prevData,
      //   [type.toLowerCase()]: [...prevData[type.toLowerCase()], newEntity[type.toLowerCase()]],
      // }));
    }
  };

  return { referenceData, handleCreateEntity };
};
