package com.dilupa.assingment.cityservice.controller;

import com.dilupa.assingment.cityservice.entity.City;
import com.dilupa.assingment.cityservice.service.CityServiceImpl;
import com.dilupa.assingment.cityservice.util.ResponseHandlerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class CityController {

    @Autowired
    private CityServiceImpl cityService;

    /**
     *
     * @param id - city ID
     * @param city - Valid city object
     * @return
     * @throws Exception
     * This method allowed only for users with ROLE_ALLOW_EDIT role
     */
    @PutMapping({"/cities/{id}"})
    @PreAuthorize("hasRole((@PreAuthorizeRoleConstant.ROLE_ALLOW_EDIT))")
    public ResponseEntity<City> updateCity(@PathVariable int id, @RequestBody @Valid City city) throws Exception {

        City cityResult = cityService.updateCityById(id, city);

        return ResponseHandlerUtil.generateResponse(HttpStatus.OK, "Successfully updated", cityResult);
    }

    /**
     * This is pagination method. has to pass correct offset and pageSize values
     * @param offset
     * @param pageSize
     * @return
     * @throws Exception
     */
    @GetMapping({"/cities"})
    public ResponseEntity<Page<City>> getAllWithPagination(@RequestParam("offset") int offset, @RequestParam("pageSize") int pageSize) throws Exception {
        Page<City> cityListResult = cityService.getAllWithPagination(offset, pageSize);
        return ResponseHandlerUtil.generateResponse(HttpStatus.OK, "Success", cityListResult);
    }
}
