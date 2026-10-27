import { WEEKDAYS, type ScheduleCell, type ScheduleRow } from "@/lib/doctors";
import styles from "./about.module.css";

type Props = {
  rows: ScheduleRow[];
  notes?: string[];
  /** 표 캡션 (스크린리더용) */
  caption: string;
};

/** 칸 표기: 진료(남색) / 수술(금색) / 휴진(-) / 빈칸 / 안내 문구 */
function Cell({ value }: { value: ScheduleCell }) {
  if (typeof value === "object") return <span className={styles.slotNote}>{value.note}</span>;
  if (value === "-") return <span className={styles.slotOff} aria-label="휴진">-</span>;
  if (value === "") return null;
  return (
    <span className={styles.slotWrap}>
      {value.split("·").map((v) => (
        <span key={v} className={`${styles.slot} ${v === "진료" ? styles.slotClinic : styles.slotSurgery}`}>
          {v}
        </span>
      ))}
    </span>
  );
}

/** 의사별 주간 진료시간표 (모바일에서는 가로 스크롤) */
export default function ScheduleTable({ rows, notes, caption }: Props) {
  return (
    <div>
      <div className={styles.legend} aria-hidden>
        <span className={`${styles.slot} ${styles.slotClinic}`}>진료</span>
        <span className={`${styles.slot} ${styles.slotSurgery}`}>수술</span>
        <span className={styles.legendOff}>- 휴진</span>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" colSpan={2}>
                진료시간
              </th>
              {WEEKDAYS.map((d) => (
                <th key={d} scope="col">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              // 오전/오후 첫 행에만 구분 칸 (rowSpan)
              const first = i === 0 || rows[i - 1].period !== r.period;
              const span = rows.filter((x) => x.period === r.period).length;
              return (
                <tr key={`${r.period}-${r.time}`}>
                  {first && (
                    <th scope="rowgroup" rowSpan={span} className={styles.period}>
                      {r.period}
                    </th>
                  )}
                  <th scope="row" className={styles.time}>
                    {r.time}
                  </th>
                  {r.slots.map((v, j) => (
                    <td key={WEEKDAYS[j]}>
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {notes && notes.length > 0 && (
        <ul className={styles.tableNotes}>
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
