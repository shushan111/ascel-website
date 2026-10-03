/**
 * Photographs from courses already held, selected from the Gyumri Orthopedic
 * School archive (data/gos/images) and re-encoded into /public/images/work.
 * Each entry records the original file (`source`) and the page it was
 * published on (`sourceUrl`), so publication rights can be checked per photo.
 * `hip2022` has no course record in the CMS yet, so its photos carry no
 * caption on the site; the source is still listed here.
 *
 * Captions are not written here: each photo names its course by slug, and the
 * title and date are read from that course's record, so a caption can never
 * drift from what the course page says.
 */
export interface WorkPhoto {
  src: string;
  /** Slug of the course the photograph was taken at. */
  course: string;
  /** The original file in the scraped archive, for checking usage rights. */
  source: string;
  /** The course page on gyumriorthoschool.org the archive was scraped from. */
  sourceUrl: string;
  width: number;
  height: number;
}

export const workPhotos = {
  heroHandsOn: { src: "/images/work/exfix2022-hands-on.webp", course: "exfix2022", source: "data/gos/images/exfix2022/18-L1200258_1980x1321.jpg", sourceUrl: "https://gyumriorthoschool.org/exfix2022", width: 1980, height: 1321 },
  exfixTeam: { src: "/images/work/exfix2022-team.webp", course: "exfix2022", source: "data/gos/images/exfix2022/21-L1200243_1980x1321.jpg", sourceUrl: "https://gyumriorthoschool.org/exfix2022", width: 1980, height: 1321 },
  exfixDetail: { src: "/images/work/exfix2022-detail.webp", course: "exfix2022", source: "data/gos/images/exfix2022/23-L1200228_1980x1321.jpg", sourceUrl: "https://gyumriorthoschool.org/exfix2022", width: 1980, height: 1321 },
  exfixPelvis: { src: "/images/work/exfix2022-pelvis.webp", course: "exfix2022", source: "data/gos/images/exfix2022/42-L1200044_1980x1321.jpg", sourceUrl: "https://gyumriorthoschool.org/exfix2022", width: 1680, height: 1120 },
  exfixFootModel: { src: "/images/work/exfix2022-foot-model.webp", course: "exfix2022", source: "data/gos/images/exfix2022/26-L1200215_1980x1321.jpg", sourceUrl: "https://gyumriorthoschool.org/exfix2022", width: 1680, height: 1120 },
  boneHall: { src: "/images/work/bone2022-hall.webp", course: "bone2022", source: "data/gos/images/bone2022/26-L1040867.jpg", sourceUrl: "https://gyumriorthoschool.org/bone2022", width: 1680, height: 1121 },
  boneLecture: { src: "/images/work/bone2022-lecture.webp", course: "bone2022", source: "data/gos/images/bone2022/13-L1040265.jpg", sourceUrl: "https://gyumriorthoschool.org/bone2022", width: 1680, height: 1121 },
  hipHall: { src: "/images/work/hip2022-hall.webp", course: "hip2022", source: "data/gos/images/hip2022/12-GAR_2222.JPG", sourceUrl: "https://gyumriorthoschool.org/hip2022", width: 1024, height: 683 },
  hipHandsOn: { src: "/images/work/hip2022-hands-on.webp", course: "hip2022", source: "data/gos/images/hip2022/25-DSC_7868.JPG", sourceUrl: "https://gyumriorthoschool.org/hip2022", width: 1024, height: 687 },
  hipGroup: { src: "/images/work/hip2022-group.webp", course: "hip2022", source: "data/gos/images/hip2022/27-DSC_7889.JPG", sourceUrl: "https://gyumriorthoschool.org/hip2022", width: 1024, height: 687 },
  kneeHandsOn: { src: "/images/work/knee2019-hands-on.webp", course: "knee2019", source: "data/gos/images/knee2019/49-A89A5480.JPG", sourceUrl: "https://gyumriorthoschool.org/knee2019", width: 1024, height: 683 },
  kneeGroup: { src: "/images/work/knee2019-group.webp", course: "knee2019", source: "data/gos/images/knee2019/56-A89A5750.JPG", sourceUrl: "https://gyumriorthoschool.org/knee2019", width: 1024, height: 683 },
} satisfies Record<string, WorkPhoto>;

/**
 * Photographs shown on a programme's own page. Only programmes whose courses
 * are in the archive have any: every photo above is from a Gyumri Orthopedic
 * School course. The other programmes show their CMS image alone.
 */
export const programPhotos: Record<string, WorkPhoto[]> = {
  "gyumri-orthopedic-school": [
    workPhotos.exfixTeam,
    workPhotos.kneeHandsOn,
    workPhotos.hipHandsOn,
    workPhotos.boneHall,
  ],
};
