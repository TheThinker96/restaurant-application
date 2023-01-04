import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IClientChad } from '../client-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../client-chad.test-samples';

import { ClientChadService } from './client-chad.service';

const requireRestSample: IClientChad = {
  ...sampleWithRequiredData,
};

describe('ClientChad Service', () => {
  let service: ClientChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IClientChad | IClientChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ClientChadService);
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

    it('should create a ClientChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(client).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ClientChad', () => {
      const client = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(client).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ClientChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ClientChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ClientChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addClientChadToCollectionIfMissing', () => {
      it('should add a ClientChad to an empty array', () => {
        const client: IClientChad = sampleWithRequiredData;
        expectedResult = service.addClientChadToCollectionIfMissing([], client);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(client);
      });

      it('should not add a ClientChad to an array that contains it', () => {
        const client: IClientChad = sampleWithRequiredData;
        const clientCollection: IClientChad[] = [
          {
            ...client,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addClientChadToCollectionIfMissing(clientCollection, client);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ClientChad to an array that doesn't contain it", () => {
        const client: IClientChad = sampleWithRequiredData;
        const clientCollection: IClientChad[] = [sampleWithPartialData];
        expectedResult = service.addClientChadToCollectionIfMissing(clientCollection, client);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(client);
      });

      it('should add only unique ClientChad to an array', () => {
        const clientArray: IClientChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const clientCollection: IClientChad[] = [sampleWithRequiredData];
        expectedResult = service.addClientChadToCollectionIfMissing(clientCollection, ...clientArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const client: IClientChad = sampleWithRequiredData;
        const client2: IClientChad = sampleWithPartialData;
        expectedResult = service.addClientChadToCollectionIfMissing([], client, client2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(client);
        expect(expectedResult).toContain(client2);
      });

      it('should accept null and undefined values', () => {
        const client: IClientChad = sampleWithRequiredData;
        expectedResult = service.addClientChadToCollectionIfMissing([], null, client, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(client);
      });

      it('should return initial array if no ClientChad is added', () => {
        const clientCollection: IClientChad[] = [sampleWithRequiredData];
        expectedResult = service.addClientChadToCollectionIfMissing(clientCollection, undefined, null);
        expect(expectedResult).toEqual(clientCollection);
      });
    });

    describe('compareClientChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareClientChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareClientChad(entity1, entity2);
        const compareResult2 = service.compareClientChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareClientChad(entity1, entity2);
        const compareResult2 = service.compareClientChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareClientChad(entity1, entity2);
        const compareResult2 = service.compareClientChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
