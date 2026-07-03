import { t } from "@lingui/core/macro";
import { useState } from "react";

import activityLogsIconDark from "~/assets/activity-logs-dark.json";
import activityLogsIconLight from "~/assets/activity-logs-light.json";
import boardVisibilityIconDark from "~/assets/board-visibility-dark.json";
import boardVisibilityIconLight from "~/assets/board-visibility-light.json";
import commentsIconDark from "~/assets/comments-dark.json";
import commentsIconLight from "~/assets/comments-light.json";
import importsIconDark from "~/assets/imports-dark.json";
import importsIconLight from "~/assets/imports-light.json";
import integrationsIconDark from "~/assets/integrations-dark.json";
import integrationsIconLight from "~/assets/integrations-light.json";
import labelsIconDark from "~/assets/labels-dark.json";
import labelsIconLight from "~/assets/labels-light.json";
import membersIconDark from "~/assets/members-dark.json";
import membersIconLight from "~/assets/members-light.json";
import templatesIconDark from "~/assets/templates-dark.json";
import templatesIconLight from "~/assets/templates-light.json";
import LottieIcon from "~/components/LottieIcon";

const FeatureItem = ({
  feature,
}: {
  feature: {
    title: string;
    description: string;
    icon: Record<string, unknown>;
    comingSoon?: boolean;
    new?: boolean;
  };
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [index, setIndex] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIndex((index) => index + 1);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-light-200 bg-light-50 p-2 dark:border-dark-200 dark:bg-dark-50"
    >
      <div className="absolute left-8 top-8 h-2 w-2 rounded-full bg-light-200 dark:bg-dark-200" />
      <div className="absolute right-8 top-8 h-2 w-2 rounded-full bg-light-200 dark:bg-dark-200" />
      <div className="absolute bottom-8 left-8 h-2 w-2 rounded-full bg-light-200 dark:bg-dark-200" />
      <div className="absolute bottom-8 right-8 h-2 w-2 rounded-full bg-light-200 dark:bg-dark-200" />

      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-light-300 bg-light-200 dark:border-dark-600 dark:bg-dark-200">
        <LottieIcon index={index} json={feature.icon} isPlaying={isHovered} />
      </div>

      <div className="relative mt-2 w-full px-4 text-center">
        <p className="text-sm font-bold text-light-1000 dark:text-dark-1000 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-0">
          {feature.title}
        </p>
        <p className="max mt-2 text-sm text-light-950 dark:text-dark-900 sm:absolute sm:inset-0 sm:mt-0 sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100">
          {feature.description}
        </p>
      </div>

      {feature.comingSoon && (
        <div className="absolute right-4 top-4 rounded-full border border-light-300 px-2 py-1 text-[10px] text-light-1000 dark:border-dark-600 dark:bg-dark-50 dark:text-dark-900">
          {t`Segera Hadir`}
        </div>
      )}

      {feature.new && (
        <div className="absolute right-4 top-4 rounded-full border border-light-300 px-2 py-1 text-[10px] text-light-1000 dark:border-dark-600 dark:bg-dark-50 dark:text-dark-900">
          {t`Baru`}
        </div>
      )}
    </div>
  );
};

const Features = ({ theme }: { theme: "light" | "dark" }) => {
  const isDark = theme === "dark";

  const features = [
    {
      title: t`Visibilitas Papan`,
      description: t`Kontrol siapa yang bisa melihat dan mengedit papan Anda.`,
      icon: isDark ? boardVisibilityIconDark : boardVisibilityIconLight,
    },
    {
      title: t`Anggota Workspace`,
      description: t`Bekerja sama dengan tim Anda secara seamless.`,
      icon: isDark ? membersIconDark : membersIconLight,
    },
    {
      title: t`Label & Filter`,
      description: t`Atur dan temukan kartu dengan cepat menggunakan alat filter yang powerful.`,
      icon: isDark ? labelsIconDark : labelsIconLight,
    },
    {
      title: t`Komentar`,
      description: t`Diskusi dan berkolaborasi pada kartu.`,
      icon: isDark ? commentsIconDark : commentsIconLight,
    },
    {
      title: t`Log Aktivitas`,
      description: t`Lacak semua perubahan kartu dengan riwayat aktivitas yang detail.`,
      icon: isDark ? activityLogsIconDark : activityLogsIconLight,
    },
    {
      title: t`Template`,
      description: t`Hemat waktu dengan template papan yang bisa digunakan berulang kali.`,
      icon: isDark ? templatesIconDark : templatesIconLight,
      new: true,
    },
    {
      title: t`Integrasi`,
      description: t`Hubungkan alat favorit Anda untuk memperlancar alur kerja.`,
      icon: isDark ? integrationsIconDark : integrationsIconLight,
      comingSoon: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 pb-24">
        <div className="flex items-center gap-2 rounded-full border bg-light-50 px-4 py-1 text-center text-xs text-light-1000 dark:border-dark-300 dark:bg-dark-50 dark:text-dark-900 lg:text-sm">
          <p>{t`Fitur`}</p>
        </div>

        <p className="mt-2 text-center text-3xl font-bold text-light-1000 dark:text-dark-1000 lg:text-4xl">
          {t`Kanban yang lebih baik`}
        </p>
        <p className="text-md lg:text-md mt-3 max-w-[500px] text-center text-light-950 dark:text-dark-900">
          {t`Manajemen tugas yang sederhana dan visual. Seret dan lepas kartu, berkolaborasi dengan tim, dan selesaikan lebih banyak pekerjaan.`}
        </p>
        <div className="mx-auto mt-16 w-full max-w-7xl">
          <div className="grid w-full grid-cols-1 gap-4 [mask-image:linear-gradient(to_bottom,black_92%,transparent_100%)] sm:grid-cols-2 md:grid-cols-3 md:[mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] lg:grid-cols-4 lg:[mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
            {features.map((feature, index) => (
              <FeatureItem key={`feature-${index}`} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
