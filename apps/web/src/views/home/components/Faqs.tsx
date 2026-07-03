import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { HiMiniMinusSmall, HiMiniPlusSmall } from "react-icons/hi2";

const Text = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-[14px] leading-[1.7rem] text-light-800 dark:text-dark-800">
      {children}
    </p>
  );
};

const Faqs = () => {
  const faqs = [
    {
      question: t`Kenapa membuat Trello open source?`,
      answer: (
        <Text>
          {t`Ketika Trello diluncurkan pada tahun 2011, semuanya kagum dengan kesederhanaan yang dirancang dengan hati-hati, namun seiring waktu keajaiban itu hilang dan berkembang menjadi sesuatu yang lebih mirip "Jira Lite". Proyek ini adalah upaya kami untuk mengembalikan keajaiban kesederhanaan Trello yang asli, dalam bentuk open source.`}
        </Text>
      ),
    },
    {
      question: t`Apa perbedaan antara Kan dan Trello?`,
      answer: (
        <Text>
          {t`Perbedaan utama antara Kan dan Trello adalah Kan bersifat open source, memungkinkan siapa saja untuk melihat, memodifikasi, dan berkontribusi pada kode kami. Penawaran cloud kami juga tidak memiliki batasan fitur untuk penggunaan individu, sedangkan Trello mengunci fitur dasar seperti jumlah papan yang bisa dibuat di balik paywall.`}
        </Text>
      ),
    },
    {
      question: t`Bagaimana proyek ini didanai?`,
      answer: (
        <Text>
          {t`Untuk keberlanjutan jangka panjang, kami mengakui semua proyek open source yang baik membutuhkan sumber pendapatan. Pendapatan kami berasal dari penawaran cloud berbayar untuk workspace dengan banyak pengguna dan untuk slug workspace kustom. Tidak ada kewajiban untuk menggunakannya, dan Anda bisa self-host perangkat lunak di infrastruktur Anda sendiri secara gratis.`}
        </Text>
      ),
    },
    {
      question: t`Bagaimana cara mendapatkan URL kustom?`,
      answer: (
        <Text>
          <Trans>
            Anda bisa mendapatkan URL workspace kustom, seperti{" "}
            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/kan"} className="underline">
              managPro/kan
            </Link>
            , dengan masuk ke{" "}
            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/settings"} className="underline">
              pengaturan workspace
            </Link>{" "}
            dan membeli langganan workspace pro. Semua langganan membantu mendanai pengembangan proyek!
          </Trans>
        </Text>
      ),
    },
    {
      question: t`Apakah ada paket gratis?`,
      answer: (
        <Text>
          {t`Ya, kami menawarkan paket gratis selamanya untuk penggunaan individu. Tanpa batasan, tanpa paywall, tanpa limit.`}
        </Text>
      ),
    },
    {
      question: t`Lisensi apa yang digunakan?`,
      answer: (
        <Text>
          <Trans>
            Kami menggunakan{" "}
            <Link
              href="https://github.com/kan-bn/kan/blob/main/LICENSE"
              className="underline"
            >
              lisensi AGPL-3.0
            </Link>
            .
          </Trans>
        </Text>
      ),
    },
    {
      question: t`Bagaimana cara mengundang anggota tim?`,
      answer: (
        <Text>
          <Trans>
            Anda bisa mengundang anggota tim dengan mengklik tombol "Undang" di
            pojok kanan atas{" "}
            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/members"} className="underline">
              halaman anggota
            </Link>{" "}
            dan memasukkan alamat email mereka. Mereka akan menerima email dengan
            tautan untuk bergabung ke workspace.
          </Trans>
        </Text>
      ),
    },
    {
      question: t`Bagaimana cara self-host?`,
      answer: (
        <Text>
          <Trans>
            Anda bisa self-host dengan mengikuti petunjuk di{" "}
            <Link href="https://github.com/kanbn/kan" className="underline">
              repositori kami
            </Link>
            .
          </Trans>
        </Text>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-[900px] px-4">
      <div className="flex flex-col items-center justify-center pb-12">
        <div className="flex items-center gap-2 rounded-full border bg-light-50 px-4 py-1 text-center text-xs text-light-1000 dark:border-dark-300 dark:bg-dark-50 dark:text-dark-900 lg:text-sm">
          <p>{t`FAQ`}</p>
        </div>

        <p className="mt-2 text-center text-3xl font-bold text-light-1000 dark:text-dark-1000 lg:text-4xl">
          {t`Pertanyaan?`}
        </p>
        <p className="text lg:text-md mt-3 max-w-[500px] text-center text-light-950 dark:text-dark-900">
          <Trans>
            Temukan jawaban untuk pertanyaan umum tentang Kan. Tidak menemukan
            yang Anda cari? Jangan ragu untuk{" "}
            <Link href="mailto:support@kan.bn" className="underline">
              hubungi kami
            </Link>
            .
          </Trans>
        </p>
      </div>
      <div className="rounded-2xl bg-light-50 ring-1 ring-light-300 dark:bg-dark-50 dark:ring-dark-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <dl className="divide-y divide-light-300 dark:divide-dark-200">
              {faqs.map((faq) => (
                <Disclosure
                  key={faq.question}
                  as="div"
                  className="py-5 first:pt-0 last:pb-0"
                >
                  <dt>
                    <DisclosureButton className="group flex w-full items-center justify-between text-left text-light-1000 dark:text-dark-1000">
                      <span className="text-[14px] font-semibold">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center text-light-800 dark:text-dark-800">
                        <HiMiniPlusSmall
                          aria-hidden="true"
                          className="size-6 group-data-[open]:hidden"
                        />
                        <HiMiniMinusSmall
                          aria-hidden="true"
                          className="size-6 group-[&:not([data-open])]:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    {faq.answer}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
