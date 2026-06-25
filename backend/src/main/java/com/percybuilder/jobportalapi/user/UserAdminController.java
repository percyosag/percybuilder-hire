package com.percybuilder.jobportalapi.user;

import com.percybuilder.jobportalapi.common.constants.ApiPaths;
import com.percybuilder.jobportalapi.user.dto.UserAdminResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(ApiPaths.USERS + "/admin")
@RestController
public class UserAdminController {

    private final UserAdminService userAdminService;

    @GetMapping("/search")
    public ResponseEntity<UserAdminResponse> findUserByEmail(@RequestParam String email) {
        UserAdminResponse response = userAdminService.findUserByEmail(email);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{userId}/role/employer")
    public ResponseEntity<UserAdminResponse> promoteUserToEmployer(@PathVariable Long userId) {
        UserAdminResponse response = userAdminService.promoteUserToEmployer(userId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{userId}/company/{companyId}")
    public ResponseEntity<UserAdminResponse> assignCompanyToUser(
            @PathVariable Long userId,
            @PathVariable Long companyId
    ) {
        UserAdminResponse response = userAdminService.assignCompanyToUser(userId, companyId);
        return ResponseEntity.ok(response);
    }
}