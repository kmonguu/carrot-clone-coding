import db from "@/app/libs/db";
import getSession from "@/app/libs/session";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    return user;
  }
  notFound();
};

export default async function MyPage() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/auth");
  };

  return (
    <div>
      <form action={logout}>
        <button>logout</button>
      </form>
    </div>
  );
}
