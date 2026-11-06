import { Service, signal } from '@angular/core';

@Service()
export class AdultService {
    isAuthorized = signal(true);

    toggleAuthorization() {
        this.isAuthorized.update(value => !value);
    }
}
