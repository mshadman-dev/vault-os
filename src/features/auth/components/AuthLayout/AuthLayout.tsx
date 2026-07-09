/**
 * AuthLayout — centred card wrapper for all auth pages.
 *
 * Renders the Vault OS logo mark, a heading, optional subheading,
 * and a footer link (e.g. "Already have an account? Log in").
 */
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  heading: string;
  subheading?: string;
  footerText?: string;
  footerLinkLabel?: string;
  footerLinkTo?: string;
  children: ReactNode;
}

export function AuthLayout({
  heading,
  subheading,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoMark} aria-hidden="true">V</div>
          <span className={styles.logoName}>Vault OS</span>
        </div>

        <h1 className={styles.heading}>{heading}</h1>
        {subheading && <p className={styles.subheading}>{subheading}</p>}

        {children}

        {footerText && footerLinkLabel && footerLinkTo && (
          <p className={styles.footer}>
            {footerText}{" "}
            <Link to={footerLinkTo} className={styles.footerLink}>
              {footerLinkLabel}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
