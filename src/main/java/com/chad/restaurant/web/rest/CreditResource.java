package com.chad.restaurant.web.rest;

import com.chad.restaurant.repository.CreditRepository;
import com.chad.restaurant.service.CreditService;
import com.chad.restaurant.service.dto.CreditDTO;
import com.chad.restaurant.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link com.chad.restaurant.domain.Credit}.
 */
@RestController
@RequestMapping("/api")
public class CreditResource {

    private final Logger log = LoggerFactory.getLogger(CreditResource.class);

    private static final String ENTITY_NAME = "credit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CreditService creditService;

    private final CreditRepository creditRepository;

    public CreditResource(CreditService creditService, CreditRepository creditRepository) {
        this.creditService = creditService;
        this.creditRepository = creditRepository;
    }

    /**
     * {@code POST  /credits} : Create a new credit.
     *
     * @param creditDTO the creditDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new creditDTO, or with status {@code 400 (Bad Request)} if the credit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/credits")
    public ResponseEntity<CreditDTO> createCredit(@RequestBody CreditDTO creditDTO) throws URISyntaxException {
        log.debug("REST request to save Credit : {}", creditDTO);
        if (creditDTO.getId() != null) {
            throw new BadRequestAlertException("A new credit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CreditDTO result = creditService.save(creditDTO);
        return ResponseEntity
            .created(new URI("/api/credits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /credits/:id} : Updates an existing credit.
     *
     * @param id the id of the creditDTO to save.
     * @param creditDTO the creditDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated creditDTO,
     * or with status {@code 400 (Bad Request)} if the creditDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the creditDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/credits/{id}")
    public ResponseEntity<CreditDTO> updateCredit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CreditDTO creditDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Credit : {}, {}", id, creditDTO);
        if (creditDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, creditDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!creditRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CreditDTO result = creditService.update(creditDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, creditDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /credits/:id} : Partial updates given fields of an existing credit, field will ignore if it is null
     *
     * @param id the id of the creditDTO to save.
     * @param creditDTO the creditDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated creditDTO,
     * or with status {@code 400 (Bad Request)} if the creditDTO is not valid,
     * or with status {@code 404 (Not Found)} if the creditDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the creditDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/credits/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CreditDTO> partialUpdateCredit(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CreditDTO creditDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Credit partially : {}, {}", id, creditDTO);
        if (creditDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, creditDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!creditRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CreditDTO> result = creditService.partialUpdate(creditDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, creditDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /credits} : get all the credits.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of credits in body.
     */
    @GetMapping("/credits")
    public ResponseEntity<List<CreditDTO>> getAllCredits(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Credits");
        Page<CreditDTO> page = creditService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /credits/:id} : get the "id" credit.
     *
     * @param id the id of the creditDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the creditDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/credits/{id}")
    public ResponseEntity<CreditDTO> getCredit(@PathVariable Long id) {
        log.debug("REST request to get Credit : {}", id);
        Optional<CreditDTO> creditDTO = creditService.findOne(id);
        return ResponseUtil.wrapOrNotFound(creditDTO);
    }

    /**
     * {@code DELETE  /credits/:id} : delete the "id" credit.
     *
     * @param id the id of the creditDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/credits/{id}")
    public ResponseEntity<Void> deleteCredit(@PathVariable Long id) {
        log.debug("REST request to delete Credit : {}", id);
        creditService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
