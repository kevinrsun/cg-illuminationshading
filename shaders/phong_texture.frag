#version 300 es

precision mediump float;

in vec3 frag_pos;
in vec3 frag_normal;
in vec2 frag_texcoord;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform vec3 material_color;      // Ka and Kd
uniform vec3 material_specular;   // Ks
uniform float material_shininess; // n
uniform sampler2D image;          // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {
     vec3 N = normalize(frag_normal);
    vec3 L = normalize(light_position - frag_pos);
    vec3 V = normalize(camera_position - frag_pos);
    vec3 R = normalize(reflect(-L,N));
    float nDt = dot(N, L);
    vec3 shadeMap = light_ambient;
    if(nDt > 0.0) {
    
        vec3 specular = material_specular * pow(max(dot(R,V), 0.0), 0.5f);
        vec3 diffuse = material_color * nDt;
        shadeMap += specular + light_color + diffuse;

    }
    vec4 test = texture(image, frag_texcoord);
    FragColor = test * vec4(material_color + shadeMap, 1.0); 
}
