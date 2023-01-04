package com.chad.restaurant.web.rest;

import com.chad.restaurant.repository.VenteProduitRepository;
import com.chad.restaurant.service.VenteProduitService;
import com.chad.restaurant.service.dto.VenteProduitDTO;
import com.chad.restaurant.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.chad.restaurant.domain.VenteProduit}.
 */
@RestController
@RequestMapping("/api")
public class VenteProduitResource {

    private final Logger log = LoggerFactory.getLogger(VenteProduitResource.class);

    private static final String ENTITY_NAME = "venteProduit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VenteProduitService venteProduitService;

    private final VenteProduitRepository venteProduitRepository;

    public VenteProduitResource(VenteProduitService venteProduitService, VenteProduitRepository venteProduitRepository) {
        this.venteProduitService = venteProduitService;
        this.venteProduitRepository = venteProduitRepository;
    }

    /**
     * {@code POST  /vente-produits} : Create a new venteProduit.
     *
     * @param venteProduitDTO the venteProduitDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new venteProduitDTO, or with status {@code 400 (Bad Request)} if the venteProduit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vente-produits")
    public ResponseEntity<VenteProduitDTO> createVenteProduit(@Valid @RequestBody VenteProduitDTO venteProduitDTO)
        throws URISyntaxException {
        log.debug("REST request to save VenteProduit : {}", venteProduitDTO);
        if (venteProduitDTO.getId() != null) {
            throw new BadRequestAlertException("A new venteProduit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VenteProduitDTO result = venteProduitService.save(venteProduitDTO);
        return ResponseEntity
            .created(new URI("/api/vente-produits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vente-produits/:id} : Updates an existing venteProduit.
     *
     * @param id the id of the venteProduitDTO to save.
     * @param venteProduitDTO the venteProduitDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated venteProduitDTO,
     * or with status {@code 400 (Bad Request)} if the venteProduitDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the venteProduitDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vente-produits/{id}")
    public ResponseEntity<VenteProduitDTO> updateVenteProduit(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody VenteProduitDTO venteProduitDTO
    ) throws URISyntaxException {
        log.debug("REST request to update VenteProduit : {}, {}", id, venteProduitDTO);
        if (venteProduitDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, venteProduitDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!venteProduitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VenteProduitDTO result = venteProduitService.update(venteProduitDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, venteProduitDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /vente-produits/:id} : Partial updates given fields of an existing venteProduit, field will ignore if it is null
     *
     * @param id the id of the venteProduitDTO to save.
     * @param venteProduitDTO the venteProduitDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated venteProduitDTO,
     * or with status {@code 400 (Bad Request)} if the venteProduitDTO is not valid,
     * or with status {@code 404 (Not Found)} if the venteProduitDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the venteProduitDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/vente-produits/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VenteProduitDTO> partialUpdateVenteProduit(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody VenteProduitDTO venteProduitDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update VenteProduit partially : {}, {}", id, venteProduitDTO);
        if (venteProduitDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, venteProduitDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!venteProduitRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VenteProduitDTO> result = venteProduitService.partialUpdate(venteProduitDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, venteProduitDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /vente-produits} : get all the venteProduits.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of venteProduits in body.
     */
    @GetMapping("/vente-produits")
    public ResponseEntity<List<VenteProduitDTO>> getAllVenteProduits(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of VenteProduits");
        Page<VenteProduitDTO> page = venteProduitService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vente-produits/:id} : get the "id" venteProduit.
     *
     * @param id the id of the venteProduitDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the venteProduitDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vente-produits/{id}")
    public ResponseEntity<VenteProduitDTO> getVenteProduit(@PathVariable Long id) {
        log.debug("REST request to get VenteProduit : {}", id);
        Optional<VenteProduitDTO> venteProduitDTO = venteProduitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(venteProduitDTO);
    }

    /**
     * {@code DELETE  /vente-produits/:id} : delete the "id" venteProduit.
     *
     * @param id the id of the venteProduitDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vente-produits/{id}")
    public ResponseEntity<Void> deleteVenteProduit(@PathVariable Long id) {
        log.debug("REST request to delete VenteProduit : {}", id);
        venteProduitService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
