import { TestBed } from '@angular/core/testing';
import { GlobalService } from './global.service';
describe('GlobalService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(GlobalService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=global.service.spec.js.map