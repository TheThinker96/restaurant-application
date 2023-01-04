import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUserAccountChad } from '../user-account-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../user-account-chad.test-samples';

import { UserAccountChadService } from './user-account-chad.service';

const requireRestSample: IUserAccountChad = {
  ...sampleWithRequiredData,
};

describe('UserAccountChad Service', () => {
  let service: UserAccountChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserAccountChad | IUserAccountChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UserAccountChadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a UserAccountChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userAccount = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UserAccountChad', () => {
      const userAccount = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UserAccountChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UserAccountChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UserAccountChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUserAccountChadToCollectionIfMissing', () => {
      it('should add a UserAccountChad to an empty array', () => {
        const userAccount: IUserAccountChad = sampleWithRequiredData;
        expectedResult = service.addUserAccountChadToCollectionIfMissing([], userAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userAccount);
      });

      it('should not add a UserAccountChad to an array that contains it', () => {
        const userAccount: IUserAccountChad = sampleWithRequiredData;
        const userAccountCollection: IUserAccountChad[] = [
          {
            ...userAccount,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserAccountChadToCollectionIfMissing(userAccountCollection, userAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UserAccountChad to an array that doesn't contain it", () => {
        const userAccount: IUserAccountChad = sampleWithRequiredData;
        const userAccountCollection: IUserAccountChad[] = [sampleWithPartialData];
        expectedResult = service.addUserAccountChadToCollectionIfMissing(userAccountCollection, userAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userAccount);
      });

      it('should add only unique UserAccountChad to an array', () => {
        const userAccountArray: IUserAccountChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userAccountCollection: IUserAccountChad[] = [sampleWithRequiredData];
        expectedResult = service.addUserAccountChadToCollectionIfMissing(userAccountCollection, ...userAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userAccount: IUserAccountChad = sampleWithRequiredData;
        const userAccount2: IUserAccountChad = sampleWithPartialData;
        expectedResult = service.addUserAccountChadToCollectionIfMissing([], userAccount, userAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userAccount);
        expect(expectedResult).toContain(userAccount2);
      });

      it('should accept null and undefined values', () => {
        const userAccount: IUserAccountChad = sampleWithRequiredData;
        expectedResult = service.addUserAccountChadToCollectionIfMissing([], null, userAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userAccount);
      });

      it('should return initial array if no UserAccountChad is added', () => {
        const userAccountCollection: IUserAccountChad[] = [sampleWithRequiredData];
        expectedResult = service.addUserAccountChadToCollectionIfMissing(userAccountCollection, undefined, null);
        expect(expectedResult).toEqual(userAccountCollection);
      });
    });

    describe('compareUserAccountChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserAccountChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserAccountChad(entity1, entity2);
        const compareResult2 = service.compareUserAccountChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserAccountChad(entity1, entity2);
        const compareResult2 = service.compareUserAccountChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserAccountChad(entity1, entity2);
        const compareResult2 = service.compareUserAccountChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
