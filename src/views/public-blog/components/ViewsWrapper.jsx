function ViewsWrapper({ children }) {
  return (
    <div className="scrollbar-none flex h-full w-full flex-col items-center justify-start overflow-x-hidden overflow-y-scroll text-black dark:text-white">
      <div className="my-10 flex w-full grow flex-col items-stretch gap-y-10 sm:w-11/12 lg:w-10/12 2xl:w-9/12 2xl:gap-y-20">
        {children}
      </div>
    </div>
  );
}

export default ViewsWrapper;
