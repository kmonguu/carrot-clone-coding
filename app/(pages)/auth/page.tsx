import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen p-10">
      <div className="my-auto flex flex-col items-center *: font-medium">
        <span className="text-9xl">🧑‍🌾</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근마켓에 어서오세요</h2>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <Link
          href="/auth/create-account"
          className="primary-btn py-2.5 text-lg"
        >
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/auth/login">로그인</Link>
        </div>
      </div>
    </div>
  );
}
