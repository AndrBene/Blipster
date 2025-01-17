function Header() {
  return (
    <div className="flex content-center justify-between border-b-[1px] border-slate-800 bg-slate-800 px-32 py-3">
      <img src="blipster_logo.png" className="h-20" alt="not found" />
      <div className="flex items-center justify-between gap-2">
        <img src="signin.png" className="size-8" alt="not found" />
        <div className="text-lg uppercase">Sign in</div>
      </div>
    </div>
  );
}

export default Header;
