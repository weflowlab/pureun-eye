"use client";

import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CONSULT_SUBJECTS } from "@/lib/consult";
import { SITE } from "@/lib/site";
import styles from "./contact.module.css";

/** 상담 신청 폼 (페이지에 바로 놓는 형태, 실제 전송 없음 — 관리자 페이지 연동 시 교체) */
export default function ConsultForm() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);
  const [tried, setTried] = useState(false); // 제출을 한 번 눌렀으면 빈 필수 항목 아래 안내 표시

  const toggle = (v: string) => setSubjects((prev) => (prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]));

  // 필수 항목 안내 문구 (비어 있으면 표시)
  const errors = {
    name: !name.trim() && "이름을 입력해 주세요",
    phone: !phone.trim() && "연락처를 입력해 주세요",
    agree: !agree && "개인정보 수집·이용에 동의해 주세요",
  };

  // 필수 항목을 다 채웠으면 완료 화면 (서버 전송 없음)
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (errors.name || errors.phone || errors.agree) return;
    console.log("[상담신청]", { subjects, name, phone, message });
    setDone(true);
  };

  /** 필수 항목 아래 빨간 안내 */
  const err = (msg: string | false) => (tried && msg ? <p className={styles.err}>* {msg}</p> : null);

  const reset = () => {
    setSubjects([]);
    setName("");
    setPhone("");
    setMessage("");
    setAgree(false);
    setTried(false);
    setDone(false);
  };

  // 완료 화면은 폼 위에 같은 크기로 겹침 (폼은 자리만 차지하고 숨김 → 높이 그대로)
  return (
    <div className={styles.formWrap}>
      <form className={styles.form} onSubmit={submit} inert={done} aria-hidden={done || undefined}>
        <fieldset className={styles.field}>
          <legend className={styles.label}>진료 분야</legend>
          <div className={styles.subjects}>
            {CONSULT_SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={subjects.includes(s)}
                className={`${styles.subject} ${subjects.includes(s) ? styles.on : ""}`}
                onClick={() => toggle(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className={styles.row2}>
          <label className={styles.field}>
            <span className={styles.label}>
              이름 <em>*</em>
            </span>
            <input
              className={`${styles.input} ${tried && errors.name ? styles.invalid : ""}`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
            />
            {err(errors.name)}
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              연락처 <em>*</em>
            </span>
            <input
              className={`${styles.input} ${tried && errors.phone ? styles.invalid : ""}`}
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d-]/g, ""))}
              placeholder="010-0000-0000"
            />
            {err(errors.phone)}
          </label>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>문의 내용</span>
          <textarea
            className={styles.input}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="궁금하신 점을 자유롭게 적어 주세요. (선택)"
          />
        </label>

        <div className={styles.agreeWrap}>
          <label className={styles.agree}>
            <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
            <span className={styles.box} aria-hidden="true" />
            <span>
              개인정보 수집·이용에 동의합니다. <em>*</em>
            </span>
          </label>
          <a href="/privacy" target="_blank" rel="noopener" className={styles.agreeLink}>
            내용 보기
          </a>
          {err(errors.agree)}
        </div>

        <button type="submit" className={styles.submit}>
          상담 신청하기
        </button>
      </form>

      {done && (
        <div className={`${styles.form} ${styles.done}`}>
          <CircleCheck size={56} strokeWidth={1.5} aria-hidden />
          <p className={styles.doneTitle}>상담 신청이 완료되었습니다</p>
          <p className={styles.doneDesc}>{SITE.name}에서 확인 후 빠르게 연락드리겠습니다.</p>
          <div className={styles.doneBtns}>
            <button type="button" className={styles.again} onClick={reset}>
              다시 작성하기
            </button>
            <Link href="/" className={`${styles.again} ${styles.home}`}>
              메인으로
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
