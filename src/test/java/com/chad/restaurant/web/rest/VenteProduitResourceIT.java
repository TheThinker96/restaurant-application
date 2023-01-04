package com.chad.restaurant.web.rest;

import static com.chad.restaurant.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.chad.restaurant.IntegrationTest;
import com.chad.restaurant.domain.VenteProduit;
import com.chad.restaurant.domain.enumeration.VenteStatut;
import com.chad.restaurant.repository.VenteProduitRepository;
import com.chad.restaurant.service.dto.VenteProduitDTO;
import com.chad.restaurant.service.mapper.VenteProduitMapper;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link VenteProduitResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VenteProduitResourceIT {

    private static final Integer DEFAULT_QUANTITE = 1;
    private static final Integer UPDATED_QUANTITE = 2;

    private static final BigDecimal DEFAULT_PRIX = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRIX = new BigDecimal(2);

    private static final Instant DEFAULT_DATE_VENTE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_VENTE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final VenteStatut DEFAULT_STATUT = VenteStatut.ACTIVE;
    private static final VenteStatut UPDATED_STATUT = VenteStatut.CLOSED;

    private static final String ENTITY_API_URL = "/api/vente-produits";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VenteProduitRepository venteProduitRepository;

    @Autowired
    private VenteProduitMapper venteProduitMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVenteProduitMockMvc;

    private VenteProduit venteProduit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VenteProduit createEntity(EntityManager em) {
        VenteProduit venteProduit = new VenteProduit()
            .quantite(DEFAULT_QUANTITE)
            .prix(DEFAULT_PRIX)
            .dateVente(DEFAULT_DATE_VENTE)
            .statut(DEFAULT_STATUT);
        return venteProduit;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VenteProduit createUpdatedEntity(EntityManager em) {
        VenteProduit venteProduit = new VenteProduit()
            .quantite(UPDATED_QUANTITE)
            .prix(UPDATED_PRIX)
            .dateVente(UPDATED_DATE_VENTE)
            .statut(UPDATED_STATUT);
        return venteProduit;
    }

    @BeforeEach
    public void initTest() {
        venteProduit = createEntity(em);
    }

    @Test
    @Transactional
    void createVenteProduit() throws Exception {
        int databaseSizeBeforeCreate = venteProduitRepository.findAll().size();
        // Create the VenteProduit
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);
        restVenteProduitMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isCreated());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeCreate + 1);
        VenteProduit testVenteProduit = venteProduitList.get(venteProduitList.size() - 1);
        assertThat(testVenteProduit.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testVenteProduit.getPrix()).isEqualByComparingTo(DEFAULT_PRIX);
        assertThat(testVenteProduit.getDateVente()).isEqualTo(DEFAULT_DATE_VENTE);
        assertThat(testVenteProduit.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    @Transactional
    void createVenteProduitWithExistingId() throws Exception {
        // Create the VenteProduit with an existing ID
        venteProduit.setId(1L);
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        int databaseSizeBeforeCreate = venteProduitRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVenteProduitMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkQuantiteIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteProduitRepository.findAll().size();
        // set the field null
        venteProduit.setQuantite(null);

        // Create the VenteProduit, which fails.
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        restVenteProduitMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isBadRequest());

        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrixIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteProduitRepository.findAll().size();
        // set the field null
        venteProduit.setPrix(null);

        // Create the VenteProduit, which fails.
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        restVenteProduitMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isBadRequest());

        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllVenteProduits() throws Exception {
        // Initialize the database
        venteProduitRepository.saveAndFlush(venteProduit);

        // Get all the venteProduitList
        restVenteProduitMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(venteProduit.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(sameNumber(DEFAULT_PRIX))))
            .andExpect(jsonPath("$.[*].dateVente").value(hasItem(DEFAULT_DATE_VENTE.toString())))
            .andExpect(jsonPath("$.[*].statut").value(hasItem(DEFAULT_STATUT.toString())));
    }

    @Test
    @Transactional
    void getVenteProduit() throws Exception {
        // Initialize the database
        venteProduitRepository.saveAndFlush(venteProduit);

        // Get the venteProduit
        restVenteProduitMockMvc
            .perform(get(ENTITY_API_URL_ID, venteProduit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(venteProduit.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.prix").value(sameNumber(DEFAULT_PRIX)))
            .andExpect(jsonPath("$.dateVente").value(DEFAULT_DATE_VENTE.toString()))
            .andExpect(jsonPath("$.statut").value(DEFAULT_STATUT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingVenteProduit() throws Exception {
        // Get the venteProduit
        restVenteProduitMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVenteProduit() throws Exception {
        // Initialize the database
        venteProduitRepository.saveAndFlush(venteProduit);

        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();

        // Update the venteProduit
        VenteProduit updatedVenteProduit = venteProduitRepository.findById(venteProduit.getId()).get();
        // Disconnect from session so that the updates on updatedVenteProduit are not directly saved in db
        em.detach(updatedVenteProduit);
        updatedVenteProduit.quantite(UPDATED_QUANTITE).prix(UPDATED_PRIX).dateVente(UPDATED_DATE_VENTE).statut(UPDATED_STATUT);
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(updatedVenteProduit);

        restVenteProduitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, venteProduitDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isOk());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
        VenteProduit testVenteProduit = venteProduitList.get(venteProduitList.size() - 1);
        assertThat(testVenteProduit.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testVenteProduit.getPrix()).isEqualByComparingTo(UPDATED_PRIX);
        assertThat(testVenteProduit.getDateVente()).isEqualTo(UPDATED_DATE_VENTE);
        assertThat(testVenteProduit.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void putNonExistingVenteProduit() throws Exception {
        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();
        venteProduit.setId(count.incrementAndGet());

        // Create the VenteProduit
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVenteProduitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, venteProduitDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVenteProduit() throws Exception {
        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();
        venteProduit.setId(count.incrementAndGet());

        // Create the VenteProduit
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVenteProduitMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVenteProduit() throws Exception {
        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();
        venteProduit.setId(count.incrementAndGet());

        // Create the VenteProduit
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVenteProduitMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVenteProduitWithPatch() throws Exception {
        // Initialize the database
        venteProduitRepository.saveAndFlush(venteProduit);

        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();

        // Update the venteProduit using partial update
        VenteProduit partialUpdatedVenteProduit = new VenteProduit();
        partialUpdatedVenteProduit.setId(venteProduit.getId());

        partialUpdatedVenteProduit.quantite(UPDATED_QUANTITE);

        restVenteProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVenteProduit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVenteProduit))
            )
            .andExpect(status().isOk());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
        VenteProduit testVenteProduit = venteProduitList.get(venteProduitList.size() - 1);
        assertThat(testVenteProduit.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testVenteProduit.getPrix()).isEqualByComparingTo(DEFAULT_PRIX);
        assertThat(testVenteProduit.getDateVente()).isEqualTo(DEFAULT_DATE_VENTE);
        assertThat(testVenteProduit.getStatut()).isEqualTo(DEFAULT_STATUT);
    }

    @Test
    @Transactional
    void fullUpdateVenteProduitWithPatch() throws Exception {
        // Initialize the database
        venteProduitRepository.saveAndFlush(venteProduit);

        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();

        // Update the venteProduit using partial update
        VenteProduit partialUpdatedVenteProduit = new VenteProduit();
        partialUpdatedVenteProduit.setId(venteProduit.getId());

        partialUpdatedVenteProduit.quantite(UPDATED_QUANTITE).prix(UPDATED_PRIX).dateVente(UPDATED_DATE_VENTE).statut(UPDATED_STATUT);

        restVenteProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVenteProduit.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVenteProduit))
            )
            .andExpect(status().isOk());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
        VenteProduit testVenteProduit = venteProduitList.get(venteProduitList.size() - 1);
        assertThat(testVenteProduit.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testVenteProduit.getPrix()).isEqualByComparingTo(UPDATED_PRIX);
        assertThat(testVenteProduit.getDateVente()).isEqualTo(UPDATED_DATE_VENTE);
        assertThat(testVenteProduit.getStatut()).isEqualTo(UPDATED_STATUT);
    }

    @Test
    @Transactional
    void patchNonExistingVenteProduit() throws Exception {
        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();
        venteProduit.setId(count.incrementAndGet());

        // Create the VenteProduit
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVenteProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, venteProduitDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVenteProduit() throws Exception {
        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();
        venteProduit.setId(count.incrementAndGet());

        // Create the VenteProduit
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVenteProduitMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVenteProduit() throws Exception {
        int databaseSizeBeforeUpdate = venteProduitRepository.findAll().size();
        venteProduit.setId(count.incrementAndGet());

        // Create the VenteProduit
        VenteProduitDTO venteProduitDTO = venteProduitMapper.toDto(venteProduit);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVenteProduitMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(venteProduitDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VenteProduit in the database
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVenteProduit() throws Exception {
        // Initialize the database
        venteProduitRepository.saveAndFlush(venteProduit);

        int databaseSizeBeforeDelete = venteProduitRepository.findAll().size();

        // Delete the venteProduit
        restVenteProduitMockMvc
            .perform(delete(ENTITY_API_URL_ID, venteProduit.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VenteProduit> venteProduitList = venteProduitRepository.findAll();
        assertThat(venteProduitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
