import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const {
    id,
    name,
    email,
    image,
  } = req.body;
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        image,
      },
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating user." });
  }
  finally {
    async () => await prisma.$disconnect()
  }
};