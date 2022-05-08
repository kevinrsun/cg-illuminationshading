#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {

    vec4 ambientText = vec4(ambient * material_color, 1.0);
    vec4 diffuseText = vec4(diffuse * material_color, 1.0);
    vec4 specularText = vec4(specular * material_specular, 1.0);
    vec4 allText = clamp(ambientText + diffuseText + specularText, 0.0, 1.0);

    FragColor = allText * texture(image, frag_texcoord);
}
