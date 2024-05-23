"use server";

import { db } from '@/server/db';
import {
  type CaseColor,
  type CaseFinish,
  type CaseMaterial,
  type PhoneModel,
} from '@prisma/client';

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
};

export async function saveConfigDb({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  });
}
