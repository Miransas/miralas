/** Keep status/log reads out of the render loop until parallel compilation completes.
 * https://developer.mozilla.org/en-US/docs/Web/API/KHR_parallel_shader_compile
 */
export function createLaserProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string) {
  const parallel = gl.getExtension('KHR_parallel_shader_compile');
  const vertex = gl.createShader(gl.VERTEX_SHADER);
  const fragment = gl.createShader(gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  let disposed = false;
  let resolved: boolean | undefined;
  let shadersReleased = false;
  let attached = false;
  const releaseShaders = () => {
    if (shadersReleased) return;
    shadersReleased = true;
    if (attached && program) {
      if (vertex) gl.detachShader(program, vertex);
      if (fragment) gl.detachShader(program, fragment);
    }
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    // WebGL defers physical deletion of in-use objects; no RAF polling is needed.
    releaseShaders();
    if (program) gl.deleteProgram(program);
  };
  if (!vertex || !fragment || !program) {
    if (process.env.NODE_ENV !== 'production' && !gl.isContextLost()) console.error('[LaserFlow] Unable to allocate shader program.');
    dispose();
    return null;
  }
  for (const [shader, source] of [[vertex, vertexSource], [fragment, fragmentSource]] as const) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  attached = true;
  gl.linkProgram(program);
  return {
    program,
    complete: () => !parallel || Boolean(gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)),
    resolve: () => {
      if (resolved !== undefined) return resolved;
      if (disposed || gl.isContextLost()) return false;
      resolved = Boolean(gl.getProgramParameter(program, gl.LINK_STATUS));
      if (!resolved && process.env.NODE_ENV !== 'production') {
        for (const [shader, label] of [[vertex, 'vertex'], [fragment, 'fragment']] as const) {
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(`[LaserFlow] ${label} shader compilation failed:`, gl.getShaderInfoLog(shader));
        }
        console.error('[LaserFlow] Shader program linking failed:', gl.getProgramInfoLog(program));
      }
      releaseShaders();
      return resolved;
    },
    dispose,
  };
}
