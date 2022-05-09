#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
struct LightPoint {
    vec3 light_color;
    vec3 light_position;
};
uniform LightPoint lights[10];
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);

    vec3 vertex_position_alt = vec3(model_matrix * vec4(vertex_position, 1.0));
    vec3 vertex_normal_alt =  vec3(model_matrix * vec4(vertex_normal, 0.0));

    for(int i = 0; i < 10; i++) {
        vec3 N = normalize(vertex_normal_alt);
        vec3 L = normalize(lights[i].light_position - vertex_position_alt);
        vec3 V = normalize(camera_position - vertex_normal_alt);
        vec3 R = reflect(-L, N);

        float ln = dot(N, L); // nDt vs ln
        if(ln < 0.0) {
            ln = 0.0;
        }

        float rv = dot(R, V);
        if(rv < 0.0) {
            rv = 0.0;
        }

        ambient = light_ambient;
        diffuse = diffuse + lights[i].light_color * ln;
        specular = specular + lights[i].light_color * pow(rv, material_shininess);
    }
}