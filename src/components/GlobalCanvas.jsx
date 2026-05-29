import React, { useEffect, useRef } from 'react';

export default function GlobalCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, speedX: 0, speedY: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let trails = [];
    const maxParticles = 80;
    const maxTrails = 28;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Initialize floating ambient dust particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -(Math.random() * 0.4 + 0.1), // Drift up
        alpha: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 - 0.01,
        oscAmp: Math.random() * 0.5 + 0.1, // Horizontal sway
        color: Math.random() > 0.6 ? '#6d28d9' : Math.random() > 0.5 ? '#0ea5e9' : '#ffffff'
      });
    }

    const handleMouseMove = (e) => {
      const mouse = mouseRef.current;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Calculate speed
      mouse.speedX = mouse.x - mouse.lastX;
      mouse.speedY = mouse.y - mouse.lastY;
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      // Spawn glowing trail particles on cursor movement
      if (Math.abs(mouse.speedX) > 1 || Math.abs(mouse.speedY) > 1) {
        if (trails.length < maxTrails) {
          trails.push({
            x: mouse.x,
            y: mouse.y,
            size: Math.random() * 3 + 2,
            vx: (Math.random() - 0.5) * 1.5 + mouse.speedX * 0.1,
            vy: (Math.random() - 0.5) * 1.5 + mouse.speedY * 0.1,
            alpha: 0.8,
            color: Math.random() > 0.5 ? '109, 40, 217' : '14, 165, 233', // Purple or Blue
            decay: Math.random() * 0.02 + 0.015
          });
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // 1. Draw Mouse Follower Glow (Backdrop Light)
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 180
        );
        gradient.addColorStop(0, 'rgba(109, 40, 217, 0.07)'); // Nebula Purple
        gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.03)'); // Cyber Blue
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Draw & Update Ambient Dust Particles
      particles.forEach((p) => {
        // Anti-gravity push from mouse
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          const forceRadius = 130;

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            // Push away
            p.x += (dx / dist) * force * 2.5;
            p.y += (dy / dist) * force * 2.5;
          }
        }

        // Standard drift movement
        p.angle += p.angleSpeed;
        p.x += p.speedX + Math.sin(p.angle) * p.oscAmp;
        p.y += p.speedY;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Add subtle shadow/glow to dust
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        
        ctx.fillStyle = p.color === '#ffffff' ? `rgba(255, 255, 255, ${p.alpha})` : p.color;
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw & Update Mouse Glowing Trails
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.x += t.vx;
        t.y += t.vy;
        t.alpha -= t.decay;

        if (t.alpha <= 0) {
          trails.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        
        // Glow effect
        ctx.shadowBlur = t.size * 2.5;
        ctx.shadowColor = `rgba(${t.color}, ${t.alpha})`;
        
        ctx.fillStyle = `rgba(${t.color}, ${t.alpha})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
