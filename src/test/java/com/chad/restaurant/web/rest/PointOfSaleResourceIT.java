package com.chad.restaurant.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.chad.restaurant.IntegrationTest;
import com.chad.restaurant.domain.PointOfSale;
import com.chad.restaurant.repository.PointOfSaleRepository;
import com.chad.restaurant.service.dto.PointOfSaleDTO;
import com.chad.restaurant.service.mapper.PointOfSaleMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PointOfSaleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PointOfSaleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_RESPONSABLE = "AAAAAAAAAA";
    private static final String UPDATED_RESPONSABLE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/point-of-sales";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PointOfSaleRepository pointOfSaleRepository;

    @Autowired
    private PointOfSaleMapper pointOfSaleMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPointOfSaleMockMvc;

    private PointOfSale pointOfSale;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PointOfSale createEntity(EntityManager em) {
        PointOfSale pointOfSale = new PointOfSale().name(DEFAULT_NAME).responsable(DEFAULT_RESPONSABLE).adresse(DEFAULT_ADRESSE);
        return pointOfSale;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PointOfSale createUpdatedEntity(EntityManager em) {
        PointOfSale pointOfSale = new PointOfSale().name(UPDATED_NAME).responsable(UPDATED_RESPONSABLE).adresse(UPDATED_ADRESSE);
        return pointOfSale;
    }

    @BeforeEach
    public void initTest() {
        pointOfSale = createEntity(em);
    }

    @Test
    @Transactional
    void createPointOfSale() throws Exception {
        int databaseSizeBeforeCreate = pointOfSaleRepository.findAll().size();
        // Create the PointOfSale
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);
        restPointOfSaleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isCreated());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeCreate + 1);
        PointOfSale testPointOfSale = pointOfSaleList.get(pointOfSaleList.size() - 1);
        assertThat(testPointOfSale.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPointOfSale.getResponsable()).isEqualTo(DEFAULT_RESPONSABLE);
        assertThat(testPointOfSale.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    void createPointOfSaleWithExistingId() throws Exception {
        // Create the PointOfSale with an existing ID
        pointOfSale.setId(1L);
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        int databaseSizeBeforeCreate = pointOfSaleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPointOfSaleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = pointOfSaleRepository.findAll().size();
        // set the field null
        pointOfSale.setName(null);

        // Create the PointOfSale, which fails.
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        restPointOfSaleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkResponsableIsRequired() throws Exception {
        int databaseSizeBeforeTest = pointOfSaleRepository.findAll().size();
        // set the field null
        pointOfSale.setResponsable(null);

        // Create the PointOfSale, which fails.
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        restPointOfSaleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = pointOfSaleRepository.findAll().size();
        // set the field null
        pointOfSale.setAdresse(null);

        // Create the PointOfSale, which fails.
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        restPointOfSaleMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPointOfSales() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        // Get all the pointOfSaleList
        restPointOfSaleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pointOfSale.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].responsable").value(hasItem(DEFAULT_RESPONSABLE)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)));
    }

    @Test
    @Transactional
    void getPointOfSale() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        // Get the pointOfSale
        restPointOfSaleMockMvc
            .perform(get(ENTITY_API_URL_ID, pointOfSale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pointOfSale.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.responsable").value(DEFAULT_RESPONSABLE))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE));
    }

    @Test
    @Transactional
    void getNonExistingPointOfSale() throws Exception {
        // Get the pointOfSale
        restPointOfSaleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPointOfSale() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();

        // Update the pointOfSale
        PointOfSale updatedPointOfSale = pointOfSaleRepository.findById(pointOfSale.getId()).get();
        // Disconnect from session so that the updates on updatedPointOfSale are not directly saved in db
        em.detach(updatedPointOfSale);
        updatedPointOfSale.name(UPDATED_NAME).responsable(UPDATED_RESPONSABLE).adresse(UPDATED_ADRESSE);
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(updatedPointOfSale);

        restPointOfSaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pointOfSaleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isOk());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
        PointOfSale testPointOfSale = pointOfSaleList.get(pointOfSaleList.size() - 1);
        assertThat(testPointOfSale.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPointOfSale.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testPointOfSale.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    void putNonExistingPointOfSale() throws Exception {
        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();
        pointOfSale.setId(count.incrementAndGet());

        // Create the PointOfSale
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPointOfSaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pointOfSaleDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPointOfSale() throws Exception {
        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();
        pointOfSale.setId(count.incrementAndGet());

        // Create the PointOfSale
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPointOfSaleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPointOfSale() throws Exception {
        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();
        pointOfSale.setId(count.incrementAndGet());

        // Create the PointOfSale
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPointOfSaleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePointOfSaleWithPatch() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();

        // Update the pointOfSale using partial update
        PointOfSale partialUpdatedPointOfSale = new PointOfSale();
        partialUpdatedPointOfSale.setId(pointOfSale.getId());

        partialUpdatedPointOfSale.responsable(UPDATED_RESPONSABLE);

        restPointOfSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPointOfSale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPointOfSale))
            )
            .andExpect(status().isOk());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
        PointOfSale testPointOfSale = pointOfSaleList.get(pointOfSaleList.size() - 1);
        assertThat(testPointOfSale.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPointOfSale.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testPointOfSale.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
    }

    @Test
    @Transactional
    void fullUpdatePointOfSaleWithPatch() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();

        // Update the pointOfSale using partial update
        PointOfSale partialUpdatedPointOfSale = new PointOfSale();
        partialUpdatedPointOfSale.setId(pointOfSale.getId());

        partialUpdatedPointOfSale.name(UPDATED_NAME).responsable(UPDATED_RESPONSABLE).adresse(UPDATED_ADRESSE);

        restPointOfSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPointOfSale.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPointOfSale))
            )
            .andExpect(status().isOk());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
        PointOfSale testPointOfSale = pointOfSaleList.get(pointOfSaleList.size() - 1);
        assertThat(testPointOfSale.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPointOfSale.getResponsable()).isEqualTo(UPDATED_RESPONSABLE);
        assertThat(testPointOfSale.getAdresse()).isEqualTo(UPDATED_ADRESSE);
    }

    @Test
    @Transactional
    void patchNonExistingPointOfSale() throws Exception {
        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();
        pointOfSale.setId(count.incrementAndGet());

        // Create the PointOfSale
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPointOfSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pointOfSaleDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPointOfSale() throws Exception {
        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();
        pointOfSale.setId(count.incrementAndGet());

        // Create the PointOfSale
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPointOfSaleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPointOfSale() throws Exception {
        int databaseSizeBeforeUpdate = pointOfSaleRepository.findAll().size();
        pointOfSale.setId(count.incrementAndGet());

        // Create the PointOfSale
        PointOfSaleDTO pointOfSaleDTO = pointOfSaleMapper.toDto(pointOfSale);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPointOfSaleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pointOfSaleDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PointOfSale in the database
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePointOfSale() throws Exception {
        // Initialize the database
        pointOfSaleRepository.saveAndFlush(pointOfSale);

        int databaseSizeBeforeDelete = pointOfSaleRepository.findAll().size();

        // Delete the pointOfSale
        restPointOfSaleMockMvc
            .perform(delete(ENTITY_API_URL_ID, pointOfSale.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PointOfSale> pointOfSaleList = pointOfSaleRepository.findAll();
        assertThat(pointOfSaleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
