package tn.esprit.coexist.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {

    private String currentPassword;
    private String newPassword;
    String code;
}
