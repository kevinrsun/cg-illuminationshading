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

    vec3 specular = material_specular * pow(max(dot(V,R), 0.0), material_shininess);
    vec3 diffuse = material_color * max(dot(L, N), 0.0);

    FragColor = vec4(material_color + specular + diffuse, 1.0);
    
}
