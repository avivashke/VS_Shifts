import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async () => {
  try {
    const settings = await prisma.settings.findFirst();
    return settings || {};
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    throw error;
  }
};

export const updateSettings = async (data) => {
  try {
    const settings = await prisma.settings.upsert({
      where: { id: data.id || 'default' },
      update: data,
      create: data,
    });
    return settings;
  } catch (error) {
    console.error('Failed to update settings:', error);
    throw error;
  }
};