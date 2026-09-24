/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PWA Service Worker Registration & Offline Readiness Service
 */

import { registerSW } from 'virtual:pwa-register';

export interface PwaStatus {
  isOfflineReady: boolean;
  isNeedRefresh: boolean;
  isInstalled: boolean;
}

let deferredPrompt: any = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}

export function promptPwaInstall(): Promise<boolean> {
  if (!deferredPrompt) {
    return Promise.resolve(false);
  }
  return deferredPrompt.prompt().then(() => {
    return deferredPrompt.userChoice.then((choice: { outcome: string }) => {
      deferredPrompt = null;
      return choice.outcome === 'accepted';
    });
  });
}

export function canInstallPwa(): boolean {
  return !!deferredPrompt;
}

export function initPwaServiceWorker(
  onOfflineReady?: () => void,
  onNeedRefresh?: () => void
): () => void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || import.meta.env.DEV) {
    return () => {};
  }

  const updateSW = registerSW({
    onOfflineReady() {
      console.info('DILRMP Bhu-Abhilekh: Service Worker installed. Application is ready for offline land record inspection.');
      onOfflineReady?.();
    },
    onNeedRefresh() {
      console.info('DILRMP Bhu-Abhilekh: New cadastral engine update available.');
      onNeedRefresh?.();
    },
    onRegisterError(error) {
      console.warn('DILRMP Service Worker registration error:', error);
    }
  });

  return updateSW;
}
