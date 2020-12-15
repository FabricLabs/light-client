/* istanbul ignore file */
import { Store } from 'vuex';
import compareVersions from 'compare-versions';
import { CombinedStoreState } from '@/store/index';

const VERSION_FILE_PATH = (process.env.BASE_URL ?? '/') + 'version.json';

export default class ServiceWorkerAssistant {
  constructor(private store: Store<CombinedStoreState>) {
    this.updateAvailableVersion();
    setInterval(this.updateAvailableVersion, 1000 * 60 * 60);
  }

  private updateAvailableVersion = async (): Promise<void> => {
    try {
      const response = await fetch(VERSION_FILE_PATH);
      const data = await response.json();
      const version = data.version.version;

      if (compareVersions.validate(version)) {
        this.store.commit('setAvailableVersion', version);
      } else {
        throw new Error(`Maleformed version string: ${version}`);
      }
    } catch (error) {
      console.warn(`Failed to get (a valid) version: ${error.message}`); // eslint-disable-line no-console
    }
  };
}
