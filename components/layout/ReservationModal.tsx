"use client";

import { useState, type ChangeEvent } from "react";
import { CONSULT_SUBJECTS } from "@/lib/consult";
import { SITE } from "@/lib/site";
import styles from "./ReservationModal.module.css";

// 진료 분야 선택지 (lib/consult.ts 공통 — 상담 신청 페이지와 같은 목록)
const SUBJECTS = CONSULT_SUBJECTS.map((value, i) => ({ id: `subject${i + 1}`, value }));

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/** 체크 애니메이션이 있는 커스텀 체크박스 */
function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <div className={styles.cbxWrap}>
      <input className={styles.inpCbx} id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label className={styles.cbx} htmlFor={id}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </span>
        <span>{label}</span>
      </label>
    </div>
  );
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

/** 상담 신청 모달 (실제 전송 없음) */
export default function ReservationModal({ isOpen, onClose }: Props) {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  // 진료 분야 토글
  const toggleSubject = (value: string) =>
    setSubjects((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));

  // 유효성 검사 후 완료 화면 표시 (서버 전송 없음)
  const handleSubmit = () => {
    if (!agree) return alert("개인정보 취급방침을 체크해주세요.");
    if (!name.trim()) return alert("이름을 입력해주세요.");
    if (!phone.trim()) return alert("연락처를 입력해주세요.");
    console.log("[상담신청]", { name, phone, subjects });
    setDone(true);
  };

  // 닫을 때 상태 초기화
  const handleClose = () => {
    setSubjects([]);
    setName("");
    setPhone("");
    setAgree(false);
    setDone(false);
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="상담 신청" data-lenis-prevent>
        {done ? (
          /* 완료 화면 */
          <div className={styles.success}>
            <h3>상담 신청이 완료되었습니다</h3>
            <p>{SITE.name}에서 빠르게 연락드리겠습니다.</p>
            <div className={styles.btnCenter}>
              <button type="button" onClick={handleClose}>
                닫 기
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* 타이틀 */}
            <div className={styles.tops}>
              <strong className={styles.topsTitle}>상담 신청</strong>
              <span className={styles.topsSub}>RESERVATION</span>
            </div>

            <ul className={styles.formList}>
              {/* STEP 01: 진료 분야 */}
              <li className={styles.formItem}>
                <strong className={styles.stepLabel}>STEP 01. 진료 분야 선택</strong>
                <div className={styles.selects}>
                  {SUBJECTS.map((s) => (
                    <Checkbox
                      key={s.id}
                      id={s.id}
                      label={s.value}
                      checked={subjects.includes(s.value)}
                      onChange={() => toggleSubject(s.value)}
                    />
                  ))}
                </div>
              </li>

              {/* STEP 02: 예약자 정보 */}
              <li className={styles.formItem}>
                <strong className={styles.stepLabel}>STEP 02. 예약자 정보 입력</strong>
                <div className={styles.inputField}>
                  <div className={styles.npBbbx}>
                    <div className={styles.npBbx}>
                      <div className={styles.npBx1}>이름</div>
                      <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.npBbx}>
                      <div className={styles.npBx1}>연락처</div>
                      <input
                        className={styles.input}
                        type="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^\d-]/g, ""))}
                      />
                    </div>
                  </div>
                  <div className={styles.absBox}>
                    <Checkbox id="agreePrivacy" label="개인정보 취급방침" checked={agree} onChange={() => setAgree(!agree)} />
                    <a href="/privacy" target="_blank" rel="noopener" className={styles.absBoxLink}>
                      개인정보 취급방침
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            {/* 버튼 */}
            <div className={styles.btnCenter}>
              <button type="button" onClick={handleSubmit}>
                예약하기
              </button>
              <button type="button" className={styles.btnClose} onClick={handleClose}>
                닫 기
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
