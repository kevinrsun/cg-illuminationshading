#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n

out vec4 FragColor;

void main() {
    vec3 N = normalize(frag_normal);
    vec3 L = normalize(light_position - frag_pos);
    vec3 V = normalize(camera_position - frag_pos);
    vec3 R = normalize(reflect(-L,N));
    float nDt = dot(N, L);
    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);
    if(nDt > 0.0) {
        diffuse = light_color * nDt;
    }

    vec3 rVector = normalize(2.0 * N * dot(N, L) - L);
	vec3 viewVector = normalize(-frag_pos);
	float RdotV = dot(rVector, viewVector);

    if(RdotV > 0.0) {
        specular = material_specular * pow(RdotV, material_shininess);
    }

    FragColor = vec4(material_color + specular + diffuse, 1.0); 
}
