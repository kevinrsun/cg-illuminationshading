#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;

struct LightPoint {
    vec3 light_color;
    vec3 light_position;
};
uniform LightPoint lights[10];

uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    vec3 N = normalize(frag_normal);
    vec3 V = normalize(camera_position - frag_pos);

    vec3 ambient = material_color * light_ambient;
    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);
    FragColor = vec4(0.0);
    for(int pt = 0; pt < 3; pt++) {
        LightPoint point = lights[pt];
        vec3 L = normalize(point.light_position - frag_pos);
        vec3 R = normalize(2.0 * N * dot(N, L) - L);
        float nDt = dot(N, L);

        if(nDt > 0.0) {
            diffuse += (material_color + point.light_color) * nDt;
        }
        float RdotV = dot(R, V);

        if(RdotV > 0.0) {
            specular += material_specular * pow(RdotV, material_shininess);
        }

    }
    FragColor = vec4(ambient + specular + diffuse, 1.0); 
}
