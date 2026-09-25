export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading NullBreach"
      className="grid min-h-screen place-items-center bg-surface p-6"
    >
      <p className="font-mono text-body-sm text-primary">
        root@nullbreach:~$ loading<span className="loading-dots">...</span>
      </p>
    </main>
  );
}
