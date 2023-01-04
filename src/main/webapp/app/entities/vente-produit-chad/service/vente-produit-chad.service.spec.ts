import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVenteProduitChad } from '../vente-produit-chad.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../vente-produit-chad.test-samples';

import { VenteProduitChadService, RestVenteProduitChad } from './vente-produit-chad.service';

const requireRestSample: RestVenteProduitChad = {
  ...sampleWithRequiredData,
  dateVente: sampleWithRequiredData.dateVente?.toJSON(),
};

describe('VenteProduitChad Service', () => {
  let service: VenteProduitChadService;
  let httpMock: HttpTestingController;
  let expectedResult: IVenteProduitChad | IVenteProduitChad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VenteProduitChadService);
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

    it('should create a VenteProduitChad', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const venteProduit = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(venteProduit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VenteProduitChad', () => {
      const venteProduit = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(venteProduit).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VenteProduitChad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VenteProduitChad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VenteProduitChad', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVenteProduitChadToCollectionIfMissing', () => {
      it('should add a VenteProduitChad to an empty array', () => {
        const venteProduit: IVenteProduitChad = sampleWithRequiredData;
        expectedResult = service.addVenteProduitChadToCollectionIfMissing([], venteProduit);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(venteProduit);
      });

      it('should not add a VenteProduitChad to an array that contains it', () => {
        const venteProduit: IVenteProduitChad = sampleWithRequiredData;
        const venteProduitCollection: IVenteProduitChad[] = [
          {
            ...venteProduit,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVenteProduitChadToCollectionIfMissing(venteProduitCollection, venteProduit);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VenteProduitChad to an array that doesn't contain it", () => {
        const venteProduit: IVenteProduitChad = sampleWithRequiredData;
        const venteProduitCollection: IVenteProduitChad[] = [sampleWithPartialData];
        expectedResult = service.addVenteProduitChadToCollectionIfMissing(venteProduitCollection, venteProduit);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(venteProduit);
      });

      it('should add only unique VenteProduitChad to an array', () => {
        const venteProduitArray: IVenteProduitChad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const venteProduitCollection: IVenteProduitChad[] = [sampleWithRequiredData];
        expectedResult = service.addVenteProduitChadToCollectionIfMissing(venteProduitCollection, ...venteProduitArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const venteProduit: IVenteProduitChad = sampleWithRequiredData;
        const venteProduit2: IVenteProduitChad = sampleWithPartialData;
        expectedResult = service.addVenteProduitChadToCollectionIfMissing([], venteProduit, venteProduit2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(venteProduit);
        expect(expectedResult).toContain(venteProduit2);
      });

      it('should accept null and undefined values', () => {
        const venteProduit: IVenteProduitChad = sampleWithRequiredData;
        expectedResult = service.addVenteProduitChadToCollectionIfMissing([], null, venteProduit, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(venteProduit);
      });

      it('should return initial array if no VenteProduitChad is added', () => {
        const venteProduitCollection: IVenteProduitChad[] = [sampleWithRequiredData];
        expectedResult = service.addVenteProduitChadToCollectionIfMissing(venteProduitCollection, undefined, null);
        expect(expectedResult).toEqual(venteProduitCollection);
      });
    });

    describe('compareVenteProduitChad', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVenteProduitChad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVenteProduitChad(entity1, entity2);
        const compareResult2 = service.compareVenteProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVenteProduitChad(entity1, entity2);
        const compareResult2 = service.compareVenteProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVenteProduitChad(entity1, entity2);
        const compareResult2 = service.compareVenteProduitChad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
