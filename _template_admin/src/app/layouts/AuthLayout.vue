<template>
  <main class="auth-shell grid min-h-screen bg-app-page lg:grid-cols-[minmax(0,1fr)_minmax(28rem,34rem)]">
    <section class="hidden items-center justify-center bg-primary-600 p-12 text-white lg:flex">
      <div class="max-w-md">
        <p class="text-sm font-semibold uppercase tracking-wide text-primary-100">Nata Admin</p>
        <h1 class="mt-4 text-4xl font-bold">Reusable admin workflows with clean sample pages.</h1>
        <p class="mt-4 text-primary-100">Authentication screens are UI samples and stay backend-free by design.</p>
      </div>
    </section>
    <section class="flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </section>
  </main>
</template>
